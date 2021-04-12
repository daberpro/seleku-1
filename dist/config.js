let declaration = [
    "#html",
    "#css",
    "#js",
    "#head"
];
exports.declarate = (query) => {
    for (let decorator of declaration) {
        query = query.replace(decorator, "#sapartor");
    }
    return query.split("#sapartor");
};
