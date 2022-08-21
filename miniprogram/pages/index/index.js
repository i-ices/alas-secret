// index.js
// const app = getApp()
const {envList} = require('../../envList.js');

Page({
    data: {
        showUploadTip: false,
        powerList: [{
            title: '生成暗语',
            tip: '在这里生成暗语，可以选择是否二级加密',
            showItem: false,
            item: [{
                title: '普通加密',
                page: 'getOpenId'
                },
                {
                    title: '二级加密',
                    page: 'getMiniProgramCode'
                },
            ]
        }, {
            title: '解密暗语',
            tip: '在这里解密暗语，可以选择是否为二级解密',
            showItem: false,
            item: [{
                title: '普通解密',
                page: 'createCollection'
            }, {
                title: '二级解密',
                page: 'updateRecord'
            }, {
                title: '查询记录',
                page: 'selectRecord'
            }, {
                title: '聚合操作',
                page: 'sumRecord'
            }]
        }, {
            title: '帮助文档',
            tip: '',
            showItem: false,
            item: [{
                title: '普通加密',
                page: 'uploadFile'

            },{
                title: '二级加密',
                page: 'uploadFile'
            }
            ]
        }],
        envList,
        selectedEnv: envList[0],
        haveCreateCollection: false
    },

    onClickPowerInfo(e) {
        const index = e.currentTarget.dataset.index;
        const powerList = this.data.powerList;
        powerList[index].showItem = !powerList[index].showItem;
        if (powerList[index].title === '数据库' && !this.data.haveCreateCollection) {
            this.onClickDatabase(powerList);
        } else {
            this.setData({
                powerList
            });
        }
    },

    onChangeShowEnvChoose() {
        wx.showActionSheet({
            itemList: this.data.envList.map(i => i.alias),
            success: (res) => {
                this.onChangeSelectedEnv(res.tapIndex);
            },
            fail(res) {
                console.log(res.errMsg);
            }
        });
    },

    onChangeSelectedEnv(index) {
        if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
            return;
        }
        const powerList = this.data.powerList;
        powerList.forEach(i => {
            i.showItem = false;
        });
        this.setData({
            selectedEnv: this.data.envList[index],
            powerList,
            haveCreateCollection: false
        });
    },

    jumpPage(e) {
        wx.navigateTo({
            url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
        });
    },

    onClickDatabase(powerList) {
        wx.showLoading({
            title: '',
        });
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            config: {
                env: this.data.selectedEnv.envId
            },
            data: {
                type: 'createCollection'
            }
        }).then((resp) => {
            if (resp.result.success) {
                this.setData({
                    haveCreateCollection: true
                });
            }
            this.setData({
                powerList
            });
            wx.hideLoading();
        }).catch((e) => {
            console.log(e);
            this.setData({
                showUploadTip: true
            });
            wx.hideLoading();
        });
    }
});