(function (w, d, url) {
    w.addEventListener('DOMContentLoaded', ()=> {
        Promise.all([
            '/libs/polymer/polymer.html',
            '/libs/iron-icons/iron-icons.html',
            url.replace('load.js','widgets.html'),

        ].map((_url)=>{
            return new Promise((resolve,reject)=>{
                let link = d.createElement('link');
                link.setAttribute('rel','import');
                link.setAttribute('href',_url);
                link.onload = (()=>{
                    return resolve(_url)
                })

                link.onerror = (()=>{
                    return resolve('error: ' + _url)
                });

                d.querySelector('head').appendChild(link);
            });
        }))
        .then((data)=>{
            if(console && console.debug){
                console.debug(data.join('\r\n'));
            }
        });
    });
})(window,document,'{j:0}');