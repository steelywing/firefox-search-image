self.on("context", function (node) {
    return node.src && /^(ftp|https?):\/\//.test(node.src);
});

self.on("click", function (node, data) {
    self.postMessage({
        url: data,
        img: node.src,
    });
});
