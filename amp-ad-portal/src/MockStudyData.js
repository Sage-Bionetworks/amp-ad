function getMockStudyData (){
  return fetch('./MockStudyData.json');
}

let mockStudyData = getMockStudyData()
  .then( response => {
    //console.log(response);
    return response;
  });

export default mockStudyData;
