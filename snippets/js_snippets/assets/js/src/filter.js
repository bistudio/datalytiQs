const testData = [
    {
        occupation:'Teachers'
        ,hourlyRate: 60
        ,fullTimeHourlyRate: 39
        ,partTimeHourlyRate: 48
    }
    ,
    {
        ccupation:'Engineer'
        ,hourlyRate: 578
        ,fullTimeHourlyRate: 439
        ,partTimeHourlyRate: 248
    }
    ,
    {
        occupation:'Accountant'
        ,hourlyRate: 360
        ,fullTimeHourlyRate: 290
        ,partTimeHourlyRate: 198
    }
    ,
    {
        occupation:'Lawyer'
        ,hourlyRate: 730
        ,fullTimeHourlyRate: 660
        ,partTimeHourlyRate: 480
    }
    ,
    {
        occupation:'Associate Professional'
        ,hourlyRate: 870
        ,fullTimeHourlyRate: 775
        ,partTimeHourlyRate: 556
    }
]
;


const helper = (element, property) => testData.map(d => ({[element.value]: d[element.value] , [property]:d[property]}));

const getById = (id) => document.getElementById(id);

// const oldHelper = (element, property) => {
//     return testData.map(d => { return { [element.value]: d[element.value] , [property]:d[property]}});
// }

//

const workType = getById('select-work-type');
workType.getElementById

workType.addEventListener("change", () => {
    console.log(testData);
   
    const someResult = helper(workType, 'occupation' )
   
    //testData.map(d => ({ [workType.value]: d[workType.value] , occupation:d.occupation }))
    console.log(someResult)
    }    
    );
