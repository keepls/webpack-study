// import "./main.css"
import "@/sass.scss"
// Webpack 文件指纹策略是将文件名后面加上 hash 值。特别在使用 CDN 的时候，缓存是它的特点与优势

// const a="hello webpack"
// console.log(a)
// module.exports=a

// class Author{
//     name="jiang"
//     age=14
//     email="weqwewq"

//     info=()=>{
//         return{
//             name:this.name,
//             age:this.age,
//             email:this.email
//         }
//     }
// }

// module.exports=Author
// export default Author

// console.log(1278799)


import logo from '../public/test.jpg'



const img = new Image()
img.src = logo
img.width=600

document.getElementById('imgBox').appendChild(img)

// console.log(a)


class Author {
    name = 'ITEM'
    age = 18
    email = 'lxp_work@163.com'
  
    info =  () => {
      return {
        name: this.name,
        age: this.age,
        email: this.email
      }
    }
  }
  
  const author=new Author()
  console.log(author.info())
  
  
//   module.exports = Author
export {Author}
  
  

