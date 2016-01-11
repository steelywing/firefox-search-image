self.on("context", function (node) {
    return ("src" in node);
});

self.on("click", function (node, data) {
    self.postMessage({
        url: data,
        img: node.src,
    });
});
