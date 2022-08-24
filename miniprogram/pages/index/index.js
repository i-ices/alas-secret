// index.js
// const app = getApp()
const {envList} = require('../../envList.js');

Page({
    data: {
        envList,
        selectedEnv: envList[0],
        haveCreateCollection: false,
        items: [{
            src: '../../images/encryption.png',
            title: '生成暗语',
            arr: [{
                title: '普通加密',
                page: 'friendsList'
            },
                {
                    title: '二级加密',
                    page: 'friendsList'
                },
            ]
        }, {
            src: '../../images/decrypt.png',
            title: '解密暗语',
            arr: [{
                title: '普通解密',
                page: 'friendsList'
            }, {
                title: '二级解密',
                page: 'friendsList'
            }]
        }]
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
