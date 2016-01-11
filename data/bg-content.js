self.on("context", function (node) {
    return /^url\((['"]?)((ftp|https?):\/\/.*)\1\)$/.test(
        getComputedStyle(node).backgroundImage
    );
});

self.on("click", function (node, data) {
    var imgSrc = /^url\((['"]?)(.*)\1\)$/.exec(
        getComputedStyle(node).backgroundImage
    );
    
    if (!imgSrc) return;
    
    self.postMessage({
        url: data,
        img: imgSrc[2],
    });
});
