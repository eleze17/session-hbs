let btn =  document.getElementById('enviarUsuario')

btn.addEventListener('click' ,async  ()=>{
    let usuario ={} 
    usuario.nombre= document.getElementById('floatingInput').value
    let user =  await fetch('/api/formularios',{
    method:'POST',
    body:JSON.stringify(usuario),
    headers:{'Content-Type': 'application/json'},
    redirect: 'follow'
    })
    window.location.href = 'http://localhost:8080/api/formulario';
    console.log(window.location.href)

}
)






