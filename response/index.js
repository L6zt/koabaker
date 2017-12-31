	exports.success = (data) => {
		return {
			flags: 1,
			data
		}
	}
	exports.fail = ({flag = 0, errMsg}) => {
		return {
			flag,
			errMsg
		}
	}