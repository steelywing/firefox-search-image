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

var menuItems = [];
searchEngines.forEach(function (searchEngine) {
    menuItems.push(cm.Item({
        label: searchEngine.name,
        data: searchEngine.url,
        image: searchEngine.icon,
    }));
});

var onclick = function (node, data) {
    // This content script is run as browser window, so
    // can not open URL with tabs here
    self.postMessage({
        url: data,
        img: node.src,
    });
};

var searhMenu = cm.Menu({
    image: self.data.url('icon/search.png'),
    label: "Search image with",
    items: menuItems,
    context: cm.SelectorContext('img'),
    contentScript: 'self.on("click", ' + onclick + ');',
    onMessage: function (data) {
        // console.log(data);
        tabs.open(data.url.replace('{url}', encodeURIComponent(data.img)));
    },
});
