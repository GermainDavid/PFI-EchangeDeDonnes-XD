class users_API {
    static Host_URL() { return "http://localhost:5000"; }
    static API_URL() { return this.Host_URL() + "/token" };

    static initHttpState() {
        this.currentHttpError = "";
        this.currentStatus = 0;
        this.error = false;
    }
    static setHttpErrorState(xhr) {
        if (xhr.responseJSON)
            this.currentHttpError = xhr.responseJSON.error_description;
        else
            this.currentHttpError = xhr.statusText == 'error' ? "Service introuvable" : xhr.statusText;
        this.currentStatus = xhr.status;
        this.error = true;
    }
    static async HEAD() {
        users_API.initHttpState();
        return new Promise(resolve => {
            $.ajax({
                url: this.API_URL(),
                type: 'HEAD',
                contentType: 'text/plain',
                complete: data => { resolve(data.getResponseHeader('ETag')); },
                error: (xhr) => { users_API.setHttpErrorState(xhr); resolve(null); }
            });
        });
    }
    static async Get(id = null) {
        console.log(id);
        users_API.initHttpState();
        return new Promise(resolve => {
            $.ajax({
                url: this.Host_URL() + "/accounts/" + (id != null ? "/" + id : ""),
                complete: data => { resolve({ ETag: data.getResponseHeader('ETag'), data: data.responseJSON }); },
                error: (xhr) => { users_API.setHttpErrorState(xhr); resolve(null); }
            });
        });
    }
    static async Promote(data){
        users_API.initHttpState();
        return new Promise(resolve => {
            $.ajax({
                url: this.Host_URL() + "/accounts/promote" ,
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: (data) => { resolve(data); },
                error: (xhr) => { users_API.setHttpErrorState(xhr); resolve(null); }
            });
        });
    }
    static async Block(data){
        users_API.initHttpState();
        return new Promise(resolve => {
            $.ajax({
                url: this.Host_URL() + "/accounts/block" ,
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: (data) => { resolve(data); },
                error: (xhr) => { users_API.setHttpErrorState(xhr); resolve(null); }
            });
        });
    }
    static async GetQuery(queryString = "") {
        users_API.initHttpState();
        return new Promise(resolve => {
            $.ajax({
                url: this.API_URL() + queryString,
                complete: data => {
                    resolve({ ETag: data.getResponseHeader('ETag'), data: data.responseJSON });
                },
                error: (xhr) => {
                    users_API.setHttpErrorState(xhr); resolve(null);
                }
            });
        });
    }
    /*
    static async Save(data, create = true) {
        users_API.initHttpState();
        return new Promise(resolve => {
            $.ajax({
                url: create ? this.API_URL() : this.API_URL() + "/" + data.Id,
                type: create ? "POST" : "PUT",
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: (data) => { resolve(data); },
                error: (xhr) => { users_API.setHttpErrorState(xhr); resolve(null); }
            });
        });
    }*/
    static async ConfirmationUser(id,code) {
        users_API.initHttpState();
        return new Promise(resolve => {
            $.ajax({
                url: this.Host_URL() + "/accounts/verify?id="+id+"&code="+code,
                type: "GET",
                contentType: 'text/plain',
                success: () => { resolve(true); },
                error: (xhr) => { users_API.setHttpErrorState(xhr); resolve(false); }
            });
        });
    }
    static async Login(data) {
        users_API.initHttpState();
        return new Promise(resolve => {
            $.ajax({
                url: this.Host_URL() + "/token" ,
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: (data) => { resolve(data); },
                error: (xhr) => { users_API.setHttpErrorState(xhr); resolve(null); }
            });
        });
    }
    static async Logout(Id) {
        users_API.initHttpState();
        return new Promise(resolve => {
            $.ajax({
                url: this.Host_URL() + "/accounts/logout?userId=" + Id,
                type: "GET",
                contentType: 'text/plain',
                success: (data) => { resolve(data); },
                error: (xhr) => { users_API.setHttpErrorState(xhr); resolve(null); }
            });
        });
    }
    static async Register(data) {
        users_API.initHttpState();
        return new Promise(resolve => {
            $.ajax({
                url: this.Host_URL() + "/accounts/register" ,
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: (data) => { resolve(data); },
                error: (xhr) => { users_API.setHttpErrorState(xhr); resolve(null); }
            });
        });
    }
    static async Remove(id) {
        return new Promise(resolve => {
            $.ajax({
                url: this.Host_URL() + "/accounts/remove/" + id,
                type: "GET",
                complete: () => {
                    users_API.initHttpState();
                    resolve(true);
                },
                error: (xhr) => {
                    users_API.setHttpErrorState(xhr); resolve(null);
                }
            });
        });
    }
}