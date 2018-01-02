	exports.success = (data) => {
		return JSON.stringify({
			flag: 1,
			data
		})
	}
	exports.fail = ({flag = 0, errMsg}) => {
		 let response = {}
		 switch (flag) {
			 case 222 : {
				 response = {
	                flag: 0,
	                errMsg: '参数错误'
                }
                break
			 }
			 case 404: {
			 	response = {
				    flag: 0,
				    errMsg: '找不到此接口'
			    }
			    break
			 }
			 case 999 : {
			 	response = {
			 		flag: 999,
				    errMsg: '未登录'
			    }
			    break
			 }
			 default: {
			 	response = {
			 		flag,
				    errMsg
			    }
			 }
		 }
		 return JSON.stringify(response)
	}