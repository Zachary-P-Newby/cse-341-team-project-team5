export function adminDashboard(req, res){
    return res.render("admin/dashboard", {title: "dashboard"});
}

export function accountPage(req, res){
    return res.render("account", {title: "account"});
}