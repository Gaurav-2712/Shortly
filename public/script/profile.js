let AllData = document.querySelectorAll('.AllData');

function extractDomain(url) {
    try {
        const urlObject = new URL(url);
        const parts = urlObject.hostname.split('.');
        const domain = parts.slice(-2).join('.');
        if (domain !== null) {
            return domain
        }
        
    } catch (error) {
        return "Untitled";
    }
}

function formateDate(InputDate){
    const dateObject = new Date(InputDate);
    const month = dateObject.toLocaleString('en-US', { month: 'short' });
    const year = dateObject.getFullYear();
    const date = dateObject.getDate();

    return `${date} ${month} ${year}`
}

function fetchFavicon(urlInput) {
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${urlInput}`;
    return faviconUrl;
}

AllData.forEach(element => {
    let Domainname = extractDomain(element.children[1].innerHTML)
    element.children[0].innerHTML = "Domain name : " + Domainname;
    let date = element.children[3].children[1];
    date.innerHTML = formateDate(date.innerHTML);
})

const allImage = document.querySelectorAll('img')
allImage.forEach(image => {
    let link = image.parentElement.parentElement.children[1].children[1].innerHTML
    image.src = fetchFavicon(link);
})

const from = document.getElementById('generateUrl');
from.addEventListener('submit',async function(events){
    console.log("HEllo");
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

        let shortLinkEle = document.getElementById('shortURL');
        console.log(shortLinkEle);
        shortLinkEle.innerHTML = '<a href="../shortly/' + data.message + '" class="text-blue-600 underline hover:no-underline font" target="_blank"> ./shortly/' + data.message + '</a>';
    }
    catch(error){
        console.log(error);
    }
})


async function DeleteURL(obj , shortid){

    console.log(obj , shortid);
    try {
        const response = await fetch('/url/delete', {
            method : 'DELETE',
            body : JSON.stringify({ shortId: shortid }),
            headers : {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            // const data = await response.json();
             obj.parentElement.parentElement.parentElement.parentElement.remove();
             DecrementId();
             console.log('Delete request successful');
        } else {
            console.log('Error deleting URL:', response.status, response.statusText);
        }

    } catch (error) {
        console.log(error);
    }    
}

function DecrementId(){
    const TotalID = document.getElementById('TotalID');
    let currentValue = parseInt(TotalID.textContent, 10);
    currentValue -= 1;
    TotalID.textContent = currentValue;
}