export async function handleLogin(event)
{
    event.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await fetch('/user/login', {
            method : 'POST',
            body : new URLSearchParams(formData),
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })

        const data = await response.json();
        if(data.error){
            alert(data.message)
        }
        else{
            window.location.href='user/profile';
        }
    } catch (error) {
        console.log(error , "Inside the try catch error");
    }
}

export async function handleRegister(event)
{
    event.preventDefault();
    const formData = new FormData(this);

    try {
        const response = await fetch('/user/signup', {
            method : 'POST',
            body : new URLSearchParams(formData),
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })

        const data = await response.json();
        if(data.error){
            alert(data.message)
        }
        else{
            window.location.href='../login';
        }
    } catch (error) {
        console.log(error , "Inside the try catch error");
    }
}

export async function GenerateNewURL(events){
    events.preventDefault();
    const formData = new FormData(this);
    console.log(formData);
    try {

        const response = await fetch('/url', {
            method : 'POST',
            body : new URLSearchParams(formData),
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })

        const data = await response.json();
        if(data.error){
            alert(data.message);
            return;
        }
        let shortLinkEle = document.getElementById('shortlink');
        shortLinkEle.innerHTML = '<a href="shortly/' + data.message + '" class="text-blue-600 underline hover:no-underline" target="_blank"> ./shortly/' + data.message + '</a>';
    } catch (error) {
        console.log(error);
    }


}
