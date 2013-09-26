var app = (function () {
    
    var api_key,
        authTokenData,
        authCredentials,
        client_id,
        client_secret,
        subscriptionsData;
        
    authTokenData = {};
    subscriptionsData = [];
    
    api_key = "AlY094jtmLj832m0nIKUDxcSsqTa88sl";
    client_id = "AlY094jtmLj832m0nIKUDxcSsqTa88sl";
    client_secret = "5Pqx7p70IHlHYMOQ";

    authCredentials = {
        api_key: api_key,
        client_id: client_id,
        client_secret: client_secret        
    };

    return {
        userIsSignedIn: false,
        signIn: function (username, password, callback) {
            var makingAuthRequest;
            authCredentials = $.extend(authCredentials, {
                username: username,
                password: password,
                grant_type: "password"
            });
            makingAuthRequest = makeAuthRequest(authCredentials, callback);
            makingAuthRequest.fail(function (xhr) {
                if (isInvalidAuthRequest(xhr)) showSignInErrorMessage();
            });
            this.userIsSignedIn = true;
        },
        signOut: function () {
            removeAuthTokenData();
            this.userIsSignedIn = false;
        },
        requestSubscriptionsData: function (accessToken, callback) {
            var that = this;
            $.ajax({
                beforeSend: function () {
                    // before send
                },
                headers: {
                    Authorization: "Bearer " + accessToken
                },
                type: "get",
                url: "http://motley-fool-test.apigee.net/premium/mysubscriptions?apikey=" + api_key
            }).done(function (response) {
                subscriptionsData = response;
                if (callback) callback();
            }).fail(function (xhr) {
                if (accessTokenHasExpired(xhr)) {
                    var gettingNewAuthTokenData = getNewAuthTokenData();
                    gettingNewAuthTokenData.done(function () {
                        var accessToken = that.getAccessToken();
                        that.requestSubscriptionsData(accessToken, that.listSubscriptions);
                    });
                }
            });
        },
        listSubscriptions: function () {
            var subscriptions,
                list,
                items;
            subscriptions = app.getSubscriptionsData();
            list = $('<ul></ul>');
            items = "";
            $.each(subscriptions, function () {
                items+= '<li>' + this.ProductName + '</li>';
            });
            list.append(items);
            $("#subscriptions-list").empty().append(list);
        },
        getAuthTokenData: function () {
            return authTokenData;
        },
        getSubscriptionsData: function () {
            return subscriptionsData;
        },
        getAccessToken: function () {
            return window.localStorage.getItem("accessToken");
        },
        changePage: function (filename) {
            $.mobile.changePage(filename);
        }
    };

    function makeAuthRequest (credentials, callback) {
        var that = this;
        return $.ajax({
            contentType: "application/x-www-form-urlencoded",
            data: credentials,
            type: "post",
            url: "http://motley-fool-test.apigee.net/v1/weather/access_token"
        }).done(function (response) {
            storeAuthTokenData(response);
            if (callback) callback();
        });
    }
    function getNewAuthTokenData () {
        var refreshToken,
            credentials;
        refreshToken = getRefreshToken();
        authCredentials = $.extend(authCredentials, {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        });
        return makeAuthRequest(authCredentials);
    }
    function isInvalidAuthRequest (xhr) {
        if (xhr.status === 400) return true;
    }
    function accessTokenHasExpired (xhr) {
        if (xhr.status === 401) return true;
    }
    function showSignInErrorMessage () {
        $("#sign-in-error-message").html("Fool! You typed in your username or password incorrectly. Please try signing in again.");
    }
    function storeAuthTokenData(authTokenData) {
        window.localStorage.setItem("accessToken", authTokenData.access_token);
        window.localStorage.setItem("refreshToken", authTokenData.refresh_token);
    }
    function removeAuthTokenData () {
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");
    }
    function getRefreshToken () {
        return window.localStorage.getItem("refreshToken");
    }
}());

$(document).bind("mobileinit", function() {
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
    $.extend($.mobile, {
        allowCrossDomainPages: true,
        //defaultPageTransition: "slide"
    });
    $.extend($.support, {
        cors: true
    });
    $.extend(  $.mobile , {
        defaultPageTransition: 'none'
    });
});
