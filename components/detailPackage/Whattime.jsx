import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Whattime = () => {
  return (
    <View className=" px-4 py-2">
      <TouchableOpacity onPress={() => {}} className=" ">
        <Text className="text-sm font-pbold py-2">ဘယ်အချိန် လာကြိုပေးလဲ ?</Text>
      </TouchableOpacity>
      <Text className="text-sm font-pregular py-2">
        ဧည့်သည်တွေ အဆင်ပြေတဲ့ အချိန်လာကြို ပေးပါတယ်။ ၁၀နာရီ ခရီးစဉ်အတွက်ဆို
        စထွက်တဲ့အချိန် မှ စ ပြီး သတ်မှတ်ပေးတာဖြစ်ပါတယ်။
      </Text>
      <Text className="text-sm font-pbold py-2">
        ကား Booking ဘယ်နှရက်လောက် ကြိုတင်ရင်ရမလဲ?
      </Text>
      <Text className="text-sm font-pregular py-2">
        ညအိပ်ခရီးစဉ်တွေအတွက် ခရီးသွားရက်လေး သေချာသိရင်တော့
        ၃ရက်လောက်ကြိုပြီးဘိုကင်တင်ထားလို့ရပါတယ်
        ။အရေးပေါ်ခရီးစဉ်တွေအတွက်ဆိုရင်လည်းအနည်းဆုံး ၁ ရက်တော့ ကြိုတင် Booking
        တင်ရင် အဆင်ပြေပါတယ်။
      </Text>
      <Text className="text-sm font-pbold py-2">
        Booking တင်ရင် စရံ ကြိုပေးရလား?
      </Text>
      <Text className="text-sm font-pregular py-2">
        စရံ ကြိုပေးစရာမလိုပါဘူး ။ ခရီးစဥ်ပြီးမှကားဆရာနဲ့ချေပေးလို့ရပါတယ်။
      </Text>
      <Text className="text-sm font-pbold py-2">
        ကားအသုံးပြုချိန်ဘယ်နှနာရီ ရပါသလဲ?
      </Text>
      <Text className="text-sm font-pregular py-2">
        တစ်နေ့လုံးစာအတွက်ဆိုရင်တော့ အချိန် ၁၀ နာရီသတ်မှတ်ထားပါတယ်။တရက်လုံး
        အသုံးမပြုချင်သူများအနေနဲ့ဆိုရင်တော့ ၃ နာရီ ၊ ၄ နာရီ ၊ ၆ နာရီ ဆိုပြီး
        ငှားရမ်းနိုင်ပါတယ်။
      </Text>
      <Text className="text-sm font-pbold py-2">
        ကားသုံးချိန် ၁၀ နာရီအတွင်း နေရာဘယ်နှခုသွားလို့ရလဲ ?
      </Text>
      <Text className="text-sm font-pregular py-2">
        ဘန်ကောက်မြို့တွင်းဆိုရင်တော့ အနီးအဝေးပေါ်မူတည်ပြီး ၃ နေရာမှ ၅
        နေရာထိသွားလို့ရပါတယ်။ မြို့ပြင်ဆိုရင်တော့ အသွားအပြန် အချိန်တေါအပါအဝင် ၂
        နေရာ မှ ၃ နေရာ ထိသွားနိုင်ပါတယ်။
      </Text>
      <Text className="text-sm font-pbold py-2">
        ကားနဲ့ ပတ်သတ်ပြီး ဘာ Service တွေရှိလဲ ?
      </Text>
      <Text className="text-sm font-pregular py-2">
        ကား နဲ့ ပတ်သတ်ရင်တော့ Day Trip နေ့ချင်းပြန်ကားအငှား ဝန်ဆောင်မှု ၊ ဟိုတယ်
        ကြို /ပို့ ဝန်ဆောင်မှု ၊ ညအိပ် ခရီးစဉ် ကားအငှားဝန်ဆောင်မှု ၊ Transfer
        တစ်ကြောင်းစာ ကား ဝန်ဆောင်မှုတို့ရရှိနိုင်ပါတယ်။
      </Text>
      <Text className="text-sm font-pbold py-2">
        Car Package တွေမှာဘာတွေပါလဲ?
      </Text>
      <Text className="text-sm font-pregular py-2">
        Car Package တွေမှာ ကျွမ်းကျင်ယဉ်မောင်း ၊ ဆီ ၊ လမ်းတံတာကြေး နှင့်
        ကားပါကင်ကြေးများ အပြီးအစီးပါဝင်ပါတယ်။
      </Text>
      <Text className="text-sm font-pbold py-2">
        လူဘယ်နှယောက်ကစပြီး ကားစငှားလို့ ရမလဲ?
      </Text>
      <Text className="text-sm font-pregular py-2">
        ကား အမျိုးအစားတွေမှာဆိုရင်တော့ အနည်းဆုံး ၃ယောက်ကနေ စတင်စီးနိုင်ပြီး ၊
        တစ်ယောက်ထဲလည်း ကားစီးလုံး ငှားရမ်းအသုံးပြုနိုင်ပါတယ်။
        ကားအမျိုးအစားပေါ်မူတည်ပြီး ဈေးနှုန်းက ကွာခြားသွားမှာဖြစ်ပါတယ်။
      </Text>
      <Text className="text-sm font-pbold py-2">
        သတ်မှတ်ချိန်ထက် အချိန်ကျော်လွန်ခဲ့ပါက ဘယ်လိုလုပ်ပေးလဲ?
      </Text>
      <Text className="text-sm font-pregular py-2">
        သတ်မှတ်ထားတဲ့အချိန်ထပ် ကျော်လွန်ခဲ့ပါက ၁ နာရီကို 300 BHT extra charge
        ပေး၍ ဆက်လက်ငှားရမ်းနိုင်ပါတယ်။
      </Text>
      <Text className="text-sm font-pbold py-2">
        ကားလမ်းကြောင်းရော ဆွဲပေးလား ?
      </Text>
      <Text className="text-sm font-pregular py-2">
        ဧည့်သည်တော်များသွားလိုတဲ့ မြို့ကိုပြောပြပေးရုံနဲ့ မြို့ရဲ့အထင်ကရ နေရာတွေ
        ၊ နာမည်ကြီး နေရာတွေနဲ့ Activities နေရာမျိုးစုံကို လမ်းကြောင်းဆွဲပြီး
        အသေးစိတ် package ထုတ်ပေးပါတယ်။
      </Text>
      <Text className="text-sm font-pbold py-2">
        ဆွဲထားတဲ့ Car Package တွေရှိလား?
      </Text>
      <Text className="text-sm font-pregular py-2">
        သွားချင်တဲ့ မြို့ ၊ နေရာပေါ်မူတည်ပြီး မြို့တိုင်းအတွက် package
        တွေရှိပါတယ်။ Customize package တွေလည်းရေဆွဲပေးပါတယ်။
      </Text>
      <Text className="text-sm font-pbold py-2">
        ဆက်သွယ်ရမယ့် ဖုန်းနံပတ်တွေသိချင်ပါတယ် ?
      </Text>
      <Text className="text-sm font-pregular py-2">
        Thai : +66 983 498 197, +66 984 272 050
      </Text>
      <Text className="text-sm font-pregular py-2">
        Myanmar : +95 972 185 129, +95 250 794 945, +95 262 476 803, +95 777 910
        816, +95 979 515 669, +95 9757 398 700
      </Text>
      <Text className="text-sm font-pregular py-2">
        Viber : +66 831 378 863
      </Text>
      <Text className="text-sm font-pregular py-2">
        ဘယ်ကနေ ငွေပေးချေလို့ရမလဲ ?
      </Text>
      <Text className="text-sm font-pregular py-2">
        Thailand Anywhere ရဲ့ ရုံးခွဲနေရာတွေဖြစ်တဲ့
      </Text>
      <Text className="text-sm font-pregular py-2">
        Yangon Office : အမှတ်-၃၉၊ အခန်း (၁၀၁-မြေညီ)၊ United Condo၊
        အလံပြဘုရာလမ်း၊ ဒဂုံမြို့နယ်၊ ရန်ကုန်မြို့။
      </Text>
      <Text className="text-sm font-pregular py-2">
        Mandalay Office : No -74 , 84-Street , 28 & 29 Between ၊ ChanAye TharZan
        Township , Mandalay
      </Text>
      <Text className="text-sm font-pregular py-2">
        Bangkok Office : The Palladium Shopping Mall, 4th Floor , Zone B, Room:
        IT-95, 555 Ratchaprarop Rd., Makkasan, Ratchathewi, Bangkok, Thailand
        10400. တို့မှာလည်း လူကိုဘ်တိုင်လာရောက် ဝယ်ယူ ပြီးငွေပေးချေနိုင်သလို Thai
        Bank Account , Kpay , KBZ special, AYA special
        တို့ကနေလည်းငွေပေးချေနိုင်ပါတယ်။
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Whattime;
