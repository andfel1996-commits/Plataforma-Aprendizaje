function getUserData(callback) {
setTimeout(() => {
const user = { name: "Juan", age: 30 };
callback(user);
}, 2000);
}
getUserData(function(user) {
console.log("Usuario obtenido:", user);
});

function getUserDataPromise(){
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        const user = {nombre:"Andres", edad:29};
        resolve(user);
    },2000);
    });
}
    getUserDataPromise()
    
    .then(user=>console.log("usuario obtenido con promesa:", user))
    .catch(error=> console.log("Error",error));

    async function getUserDataAsync() {
        try{
            const user = await getUserDataPromise();
            console.log("Usuario obtenido con async/await:", user);
        }catch (error){
            console.log("Error",error);
        }
    }
    getUserDataAsync();

