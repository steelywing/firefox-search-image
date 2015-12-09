var tabs = require("sdk/tabs");
var cm = require("sdk/context-menu");
var onclick = function (node, data) {
    // This content script is run as browser window, so
    // can not open URL with tabs here
    self.postMessage({
        url: data,
        img: node.src,
    });
};

var google = cm.Item({
    label: 'Google',
    data: 'https://www.google.com/searchbyimage?image_url={url}',
});

var yandex = cm.Item({
    label: 'Yandex',
    data: 'https://yandex.com/images/search?img_url={url}&rpt=imageview',
});

var baidu = cm.Item({
    label: 'Baidu',
    data: 'http://image.baidu.com/n/pc_search?queryImageUrl={url}&fm=result_camera&uptype=paste',
});

var searhMenu = cm.Menu({
    data: 'https://www.google.com/searchbyimage?image_url={url}',
    label: "Search this image with",
    items: [google, yandex, baidu],
    context: cm.SelectorContext('img'),
    contentScript: 'self.on("click", ' + onclick + ');',
    onMessage: function (data) {
        // console.log(data);
        tabs.open(data.url.replace('{url}', encodeURIComponent(data.img)));
    },
});
