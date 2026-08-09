
const translations = {
  ko:{profile:"PROFILE",lesson:"LESSON",program:"PROGRAM",tour:"TOUR",booking:"BOOKING",bookTitle:"예약 신청"},
  zh:{profile:"个人简介",lesson:"高尔夫课程",program:"训练项目",tour:"高尔夫旅行",booking:"预约申请",bookTitle:"预约申请"},
  en:{profile:"PROFILE",lesson:"LESSON",program:"PROGRAM",tour:"TOUR",booking:"BOOKING",bookTitle:"BOOKING"}
};
function setLang(lang){
  localStorage.setItem("joneLang",lang);
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k=el.dataset.i18n; if(translations[lang]&&translations[lang][k]) el.textContent=translations[lang][k];
  });
}
document.addEventListener("DOMContentLoaded",()=>{
  const lang=localStorage.getItem("joneLang")||"ko"; setLang(lang);
  document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang)));
  const mb=document.querySelector(".mobile-menu"), nav=document.querySelector(".nav");
  if(mb&&nav) mb.addEventListener("click",()=>nav.classList.toggle("open"));
  if("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(()=>{});

  document.querySelectorAll(".pick").forEach(p=>p.addEventListener("click",()=>{
    document.querySelectorAll(".pick").forEach(x=>x.classList.remove("active"));
    p.classList.add("active");
    const r=p.querySelector("input"); if(r) r.checked=true;
  }));
  const f=document.getElementById("bookingForm");
  if(f) f.addEventListener("submit",(e)=>{
    e.preventDefault();
    const fd=new FormData(f);
    const subject=encodeURIComponent("[JONE GOLF 예약 신청] "+(fd.get("name")||"신규 문의"));
    const body=encodeURIComponent(
`프로그램: ${fd.get("program")||""}
성명: ${fd.get("name")||""}
연락처: ${fd.get("contact")||""}
나이: ${fd.get("age")||""}
골프 구력: ${fd.get("career")||""}

특이 요구사항:
${fd.get("requests")||""}

예약 절차: 예약 신청 → 가격 결정 → 선금 20% 입금 → 계약 완료`
    );
    window.location.href=`mailto:jonegolf@qq.com?subject=${subject}&body=${body}`;
  });
});
