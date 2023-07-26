import Vue from 'vue';
import { extend, localize } from 'vee-validate';
import { required, email, alpha, alpha_spaces, confirmed, numeric, min } from 'vee-validate/dist/rules';

extend("min", {
    ...min,
    message: (field) => `این فیلد حداقل باید شامل ۶ حرف باشد`
});
extend("required", {
    ...required,
    message: "تکمیل این فیلد الزامیست"
});
extend("alpha", {
    ...alpha,
    message: "این فیلد فقط باید شامل حروف باشد"
});
extend("confirmed", {
    ...confirmed,
    message: "مقدار هر دو فیلد باید یکسان باشد"
});
extend("email", {
    ...email,
    message: "فرمت ایمیل وارد شده صحیح نمیباشد"
});
extend("alpha_spaces", {
    ...alpha_spaces,
    message: "این فیلد فقط میتواند شامل حروف و فاصله باشد"
});
extend("min-8", (value) => {
    if (value.length >= 6)
        return true;
    return "کلمه عبور باید حداقل 6 حرف باشد"
});
extend("min-6", (value) => {
    if (value.length >= 6)
        return true;
    return "کلمه عبور باید حداقل 6 حرف باشد"
});
extend("only-5-num", (value) => {
    if (value.length == 9)
        return true;
    return "کد ۵ رقمی را وارد نمایید"
});

extend("Email", (value) => {
    var mailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var result = mailPattern.test(value);
    if (result)
        return true;

    return "فرمت ایمیل وارد شده صحیح نمیباشد"
});
extend("phone", (value) => {
    var mobilePattern = /^[0]{1}[1-9]{1}[0-9]{9}$/;
    var result = mobilePattern.test(value)
    if (result)
        return true;
    return "فرمت شماره موبایل وارد شده صحیح نمیباشد"
});
extend("mPhone", (value) => {
    var mobilePattern = /^[0]{1}[1-9]{1}[0-9]{9}$/;
    var result = mobilePattern.test(value)
    if (result)
        return true;
    return "فرمت شماره تلفن وارد شده صحیح نمیباشد"
});
// extend("addad", (value) => {
//     //  ...required,
//     // message: "تکمیل این فیلد "
//     var addad = /^-{0,1}\d+$/
//     var internationlMobilePattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
//     var mobilePattern = /^[0]{1}[1-9]{1}[0-9]{9}$/;
//     var result = mobilePattern.test(value)
//     if (result)
//         return true;
//     return "فرمت شماره موبایل وارد شده صحیح نمیباشد"
// });
extend("verifyCode", (value) => {
    var verifyCodePattern = /^[0-9][-][0-9][-][0-9][-][0-9][-][0-9]$/
    var result = verifyCodePattern.test(value);
    if (result)
        return true
    return "فرمت کد وارد شده صحیح نمیباشد"
});
extend("justPersian", (value) => {
    var p = /^[\u0600-\u06FF\s]+$/;
    var en = /^[A-Za-z\s]+$/;
    var result = p.test(value);
    var resultEn = en.test(value);

    if (result || resultEn)
        return true
    return "این فیلد فقط میتواند شامل حروف و فاصله باشد"
});
extend("max-8-char", (value) => {
    var alphaNum = /^[a-z0-9]+$/i
    var result = alphaNum.test(value)

    if (value.length <= 8)
        return true;
    return "تعداد حروف باید حداکثر 8 حرف باشد"
});
extend("alphaNum", (value) => {
    var alphaNumber = /^[a-z0-9]+$/i
    var result = alphaNumber.test(value)

    if (result)
        return true;
    return "این فیلد می تواند شامل حروف انگلیسی و عدد باشد"
});
extend("only-6-num", (value) => {
    if (value.length == 11)
        return true;
    return "کد ۶ رقمی را وارد نمایید"
});
extend("numeric", {
    ...numeric,
    message: "این فیلد فقط باید شامل عدد باشد"
});
extend("url", (value) => {
    var url = /^((?:https?:\/\/)?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/i
    var result = url.test(value)

    if (result)
        return true;
    return "آدرس وارد شده صحیح نمی باشد"
});