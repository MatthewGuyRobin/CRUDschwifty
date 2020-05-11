const update = document.querySelector('#update-button');
const destroy = document.querySelector('#delete-button') // missed the # 
const message  = document.querySelector('#message')

update.addEventListener('click', _ => {
    fetch('/quotes',{
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify({
            name: 'Shleemypants',
            quote: 'Dont fuck with time'      
        })
    }).then(res =>{
        if (res.ok) return res.json()
    })
    .then(response =>{
        window.location.reload(true)
    })
})

destroy.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Shleemypants'
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        }).then(response => {
            if(response === 'No quote to delete'){
                message.textContent = 'No Shleemypants quote to delete'
            } else {
                window.location.reload(true)
            }
}).catch(error => console.error(error))})