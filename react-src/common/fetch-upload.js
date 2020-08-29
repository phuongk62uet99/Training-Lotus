export default {
    fetchData:function(options){
        return new Promise((resolve,reject) =>{
            fetch(options.url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: JSON.stringify(options.params)
            })
            .then(response => response.json())
            .then(jsonData => {
                resolve(jsonData)
            })
            .catch(error => {
                reject(error);
            });
        })
    }
}