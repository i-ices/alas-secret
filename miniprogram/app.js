
App({

    globalData: {
        userInfo: null,
        sysInfo: null,
        openId: null,
    },

    onLaunch: function () {
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力');
        } else {
            wx.cloud.init({
                // env 参数说明：
                //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
                //   如不填则使用默认环境（第一个创建的环境）
                // env: 'my-env-id',
                traceUser: true,
            });
        }


        // 获取用户信息
        this.getSys();
    },

    //获取手机信息
    getSys: function () {
        const that = this;
        //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
        wx.getSystemInfo({
            success: function (res) {
                console.log(res)
                //设置变量值
                that.globalData.sysInfo = res;
            }
        })
    },
    /**
     * 获取openid
     */
    getOpenid(){
        const that = this;
        wx.showLoading({
            title: '',
        });
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            data: {
                type: 'getOpenId'
            }
        }).then((resp) => {
            that.globalData.openId = resp.result.openid;
            wx.hideLoading();
        }).catch((e) => {
            console.log(e)
            wx.hideLoading();
        });
    }
});
