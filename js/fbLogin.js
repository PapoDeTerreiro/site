$('#fblogin').hide();

function statusChangeCallback(response) {
    console.log(response);
    if (response.status === 'connected') {
        testAPI();
    } else if (response.status === 'not_authorized') {
        document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
    } else {
        document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '1521673121462430',
        cookie: true,
        xfbml: true,
        version: 'v2.2'
    });
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
    FB.api('/me', function (response) {
        console.log(response);
        FB.api(
            "/" + response.id + "/picture",
            function (r) {
                if (r && !r.error) {
                    $.ajax({
                        type: "POST",
                        url: 'https://papodetrreiro.firebaseio.com/' + response.id + '/login.json',
                        data: JSON.stringify(response),
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                        },
                        error: function (e) {
                            console.log(e);
                        }
                    });

                    $('#fblogin .name').html(response.name);
                    $('#fblogin .img').html('<img src="' + r.data.url + '">');
                    $('#fblogin').fadeIn();

                    console.log(r);
                }
            }
        );
    });
}
