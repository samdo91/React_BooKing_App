const mongoose = require("mongoose");
/*   oener: mongoose.Schema.Types.ObjectId:  MongoDB의 ObjectId 유형을 나타냅,  MongoDB의 기본 키 유형으로 사용되며, 12바이트의 16진수 문자열로 구성, _id 값이라고 생각하면된다.
이 스키마를 사용하는 데이터 모델에서 owner 필드를 사용할 때, 
ObjectId 유형으로 값을 설정하면 해당 값이 "user" 모델의 _id 필드와 일치하는 문서를 찾아서 참조할 수 있다.
 이를 통해 두 모델 간의 관계를 형성할 수 있다.
 */
const acommodatonSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  chekIn: Number,
  chekOut: Number,
  maxGuests: Number,
});

const acommodatonModel = mongoose.model(`acommodatonModel`, acommodatonSchema);

module.exports = acommodatonModel;
