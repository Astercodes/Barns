const dialogs=[...document.querySelectorAll('.flow-dialog')];
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.open).showModal()));
dialogs.forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()}));

const checkinForm=document.querySelector('#checkinForm');
const checkinFields=[...checkinForm.querySelectorAll('input, select')];
function updateCheckin(){const answered=checkinFields.filter(field=>field.value.trim()).length;document.querySelector('#checkinAnswered').textContent=`${answered} of ${checkinFields.length} answered`;document.querySelector('#checkinProgress').style.width=`${answered/checkinFields.length*100}%`}
checkinFields.forEach(field=>field.addEventListener('input',updateCheckin));
checkinForm.addEventListener('submit',event=>{event.preventDefault();const numeric=[...checkinForm.querySelectorAll('select')].filter(x=>x.value).map(x=>Number(x.value));const score=numeric.length?Math.round(numeric.reduce((a,b)=>a+b,0)/(numeric.length*2)*100):0;document.querySelector('#checkinDialog').close();showToast(`Check-in complete. Today’s assessed capacity is ${score}%. Your reflection has been received.`)});

document.querySelectorAll('#requirements button').forEach(button=>button.addEventListener('click',()=>button.classList.toggle('selected')));
const expectedRange=document.querySelector('#expectedRange'),currentRange=document.querySelector('#currentRange');
expectedRange.addEventListener('input',()=>document.querySelector('#expectedValue').textContent=expectedRange.value);currentRange.addEventListener('input',()=>document.querySelector('#currentValue').textContent=currentRange.value);
document.querySelector('#calculateGap').addEventListener('click',()=>{const gap=Math.max(0,Number(expectedRange.value)-Number(currentRange.value));document.querySelector('#gapNumber').textContent=gap;const selected=[...document.querySelectorAll('#requirements .selected')].map(x=>x.textContent);const fallback=['Time management','Delegation','Consistency','Financial systems'];const mapped={Leadership:'Delegation',Discipline:'Consistency','Financial stewardship':'Financial systems',Communication:'Difficult conversations','Emotional resilience':'Recovery under pressure','Spiritual maturity':'Discernment',Systems:'Time management','Team management':'Feedback systems'};const items=(selected.length?selected.map(x=>mapped[x]):fallback).slice(0,4);document.querySelector('#vulnerabilityList').innerHTML=items.map(x=>`<li>${x}</li>`).join('');document.querySelector('#gapResult').hidden=false;document.querySelector('#gapResult').scrollIntoView({behavior:'smooth',block:'nearest'})});

const barnCurrent=document.querySelector('#barnCurrent'),barnDesired=document.querySelector('#barnDesired');
barnCurrent.addEventListener('input',()=>document.querySelector('#barnCurrentValue').textContent=`${barnCurrent.value}/10`);barnDesired.addEventListener('input',()=>document.querySelector('#barnDesiredValue').textContent=`${barnDesired.value}/10`);
document.querySelector('#createBarn').addEventListener('click',()=>{const type=document.querySelector('#barnType').value;if(!type){showToast('Choose the capacity you want to create first.');return}const score=Number(barnCurrent.value)*10;const card=document.createElement('article');card.tabIndex=0;card.className='barn custom-barn';card.innerHTML=`<div class="barn-top"><span class="barn-icon">＋</span><span class="trend">new</span></div><div class="barn-name">${type}</div><div class="barn-score">${score}<small>%</small></div>`;grid.insertBefore(card,grid.lastElementChild);document.querySelector('#barnDialog').close();showToast(`${type} Barn opened. Your enlargement plan begins today.`)});

