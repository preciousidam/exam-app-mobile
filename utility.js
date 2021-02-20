import {
	widthPercentageToDP as wp2dp,
	heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import { Dimensions } from 'react-native';
  
  /**
   * Width-Percentage
   * Converts width dimension to percentage
   * 360, 760 - design were made using this scale
   * @param dimension directly taken from design wireframes
   * @returns {string} percentage string e.g. '25%'
   */
export const wp = dimension => {
	const width = Dimensions.get('window').width;
	return wp2dp((dimension / width) * 100 + '%');
};
  
  /**
   * Height-Percentage
   * Converts width dimension to percentage
   * * 360, 760 - design were made using this scale
   * @param dimension directly taken from design wireframes
   * @returns {string} percentage string e.g. '25%'
   */
export const hp = dimension => {
	const height = Dimensions.get('window').height;
	return hp2dp((dimension / height) * 100 + '%');
};

export function CommaFormatted(amount) {
	var delimiter = ","; // replace comma if desired
	var a = amount.split('.',2)
	var d = a[1];
	var i = parseInt(a[0]);
	if(isNaN(i)) { return ''; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while(n.length > 3) {
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(d.length < 1) { amount = n; }
	else { amount = n + '.' + d; }
	amount = minus + amount;
	return amount;
}

export const checkExpiry = expiry => {
	
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	const firstDate = new Date(expiry.split('-').reverse().join('-'));
	const secondDate = new Date();
	
	const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
	

	if (diffDays < 30 && firstDate > secondDate) return 1;
	else if (diffDays > 30 && firstDate > secondDate) return 2;
	else if (diffDays > 0 && firstDate < secondDate) return 0
}



export const validateCard = ({cardno,cvv,pin,expiryyear, expirymonth}) => {
	return (cardno && cvv && pin && expiryyear && expirymonth);
}


export const filterData = (category, body)=> {
	let data;
	if (category === 'Home'){
		data = {address: body.address, plan: body.plan, building_type: body.building_type, user: body.user, product: body.product, value: body.value}

		if ('items' in body){
			let hold = {}
			for (let item in body.items){
				if (body.items[item].item == '' || body.items[item].value == '') continue
				else hold[item] = body.items[item]
			}
			data['items'] = hold;
		}
		return data
	}
	else if (category === 'Motor'){
		data = {...body};
		delete data.address;
		delete data.plan;
		delete data.building_type;

		if ('items' in data){
			delete data.items;
		}
		return data
	}
}

export const isValidEmail = email => {

	let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	
	return regEmail.test(email);
}

export const isValidPassword = password => {
	
	let regPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/
	
	return regPassword.test(password);
}


