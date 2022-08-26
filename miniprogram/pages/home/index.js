const app = getApp();//写在页面顶部page()外

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        envId: '',
        show: false
    },

    /**
     * 登录
     */
    onClickLogin(e) {
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo
        });
    },

    /**
     * 点击退出登录按钮
     */
    clickExit() {
        this.setData({
            show: true
        })
    },

    /**
     * 退出登录
     */
    exitLogin() {
        app.globalData.userInfo = null;
        app.globalData.openId = null;
        this.setData({
            userInfo: null,
            show: false
        })
    },

    /**
     * 取消退出登录
     */
    exitClose() {
        this.setData({
            show: false
        })
    },

    /**
     * 点击打赏功能
     */
    clickReward(){
        wx.previewImage({
            urls: ['https://s3.bmp.ovh/imgs/2022/08/24/af48cb8b3f73933e.png'] // 需要预览的图片 http 链接列表
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            envId: options.envId
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.setData({
            userInfo: app.globalData.userInfo
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        return {
            title: '唉秘',
            imageUrl: '/images/banner.jpg',
            path: '/pages/index/index' // 路径，传递参数到指定页面。
        }
    }
})