var self = require("sdk/self");
var tabs = require("sdk/tabs");
var cm = require("sdk/context-menu");
var searchEngines = [
    {
        name: 'Google',
        icon: self.data.url('icon/google.ico'),
        url: 'https://www.google.com/searchbyimage?image_url={url}',
    },
    {
        name: 'TinEye',
        icon: self.data.url('icon/tineye.ico'),
        url: 'https://www.tineye.com/search/?&url={url}',
    },
    {
        name: 'Yandex',
        icon: self.data.url('icon/yandex.ico'),
        url: 'https://yandex.com/images/search?img_url={url}&rpt=imageview',
    },
    {
        name: 'Baidu',
        icon: self.data.url('icon/baidu.ico'),
        url: 'http://image.baidu.com/n/pc_search?queryImageUrl={url}&fm=result_camera&uptype=paste',
    },
];

var menuItems = [],
    bgMenuItems = [];

searchEngines.forEach(function (searchEngine) {
    menuItems.push(cm.Item({
        label: searchEngine.name,
        data: searchEngine.url,
        image: searchEngine.icon,
    }));
    
    bgMenuItems.push(cm.Item({
        label: searchEngine.name,
        data: searchEngine.url,
        image: searchEngine.icon,
    }));
});

var searchImage = function (data) {
    // console.log(data);
    tabs.open(data.url.replace('{url}', encodeURIComponent(data.img)));
};

var searhMenu = cm.Menu({
    image: self.data.url('icon/search.png'),
    label: "Search image with",
    items: menuItems,
    contentScriptFile: self.data.url('content.js'),
    onMessage: searchImage,
});

var searhBGMenu = cm.Menu({
    image: self.data.url('icon/search.png'),
    label: "Search background image with",
    items: bgMenuItems,
    contentScriptFile: self.data.url('bg-content.js'),
    onMessage: searchImage,
});
