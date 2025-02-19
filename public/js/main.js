console.log("JavaScript is working!"); //test script


// let deleteStudent = document.querySelectorAll('.deleteBtn')
// Array.from(deleteStudent).forEach((element) => {
//     element.addEventListener('click', deleteStudents)
// })
let deleteStudent = document.querySelectorAll('.deleteBtn');
console.log(deleteStudent); // ✅ This will show all found delete buttons

Array.from(deleteStudent).forEach((element) => {
    element.addEventListener('click', deleteStudents);
});



async function deleteStudents(){
 let firstName = this.parentNode.childNodes[1].innerText.trim() //these are not stingify so you need to stringify them to send to server
 let lastName = this.parentNode.childNodes[3].innerText.trim() //removes .trim() removes any whitespace that may be sent to the server that could cause error
                                                                 //without the .trim() the code broke and was  giving error
 try{
    const response = await fetch('/deleteStudent', {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}, //tells the server it's expecting json object
        body: JSON.stringify({
            'firstName': firstName, //first name before the the colon is what we will use to pull data off the request 
            'lastName': lastName
        })
    })
    const data = await response.json()
    console.log(data)
    // location.reload() //anothe roption to use for page refresh but use method below to manually remove the node from dom without page refresh
    if (data.success) {
        this.parentNode.remove();
    } else {
        console.error('Failed to delte one student:', data.message);
    }

 }catch(error){

 console.error(error)

}
}


//Update request

const likeBtn = document.querySelectorAll('.likes')
Array.from(likeBtn).forEach((element) => element.addEventListener('click', addLike))

async function addLike(){
    const fName = this.parentNode.childNodes[1].innerText
    const lName = this.parentNode.childNodes[3].innerText
    const likes = this.parentNode.childNodes[5].innerText
try{
    const response = await fetch('/addLike', {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            'firstnameS': fName,
            'lastNameS': lName 
         //we don't need to send the linkes because we are using increment in server side to update likes 
        })

    })
    const data = await response.json();
    console.log(data);
    location.reload(); // Refresh the page to update likes count
} catch (error) {
    console.error(error);
}
}