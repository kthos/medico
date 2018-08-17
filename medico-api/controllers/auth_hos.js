var express = require('express');
var router = express.Router();
var axios = require('axios')
const axios_config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
const auth_ip = 'http://localhost:8081/checkuser' // จากโปรแกรม rservice


router.post('/login',async (req,res)=>{
    const {username,password} = req.body
    let user_data = 'username='+username+'&password='+password
    let raw = await axios.post(auth_ip, user_data, axios_config);
    console.log(raw.data[0])
    res.json(raw.data[0])
   
});

router.get('/test',(req,res)=>{
    res.json({"test":"ok-hos"})
});

module.exports = router;