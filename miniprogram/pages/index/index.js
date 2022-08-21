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
                page: 'createSecret'
            },
                {
                    title: '二级加密',
                    page: 'createSecret'
                },
            ]
        }, {
            title: '解密暗语',
            tip: '在这里解密暗语，可以选择是否为二级解密',
            showItem: false,
            item: [{
                title: '普通解密',
                page: 'createSecret'
            }, {
                title: '二级解密',
                page: 'createSecret'
            }]
        }],
        envList,
        selectedEnv: envList[0],
        haveCreateCollection: false
    },

    onClickPowerInfo(e) {
        const index = e.currentTarget.dataset.index;
        const powerList = this.data.powerList;
        powerList[index].showItem = !powerList[index].showItem;
        this.setData({
            powerList
        });

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
    }
});
