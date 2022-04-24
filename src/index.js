import "./main.css"
import "./sass.scss"

// const a="hello webpack"
// console.log(a)
// module.exports=a

class Author{
    name="jiang"
    age=14
    email="weqwewq"

    info=()=>{
        return{
            name:this.name,
            age:this.age,
            email:this.email
        }
    }
}

module.exports=Author
// export default Author