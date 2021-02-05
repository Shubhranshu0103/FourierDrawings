function compressArr(arr,focalPoints,compressRatio)
{
    let newFP = [];
    let newArr = [];
    let j=1;

    if(compressRatio<=1)
    {
        newArr = arr;
        newFP = focalPoints;
        
        return {newArr, newFP};
    }
    
    for(let i=0;i<focalPoints.length;i++)
    {
        for(;j<focalPoints[i];j+=compressRatio)
        {
            newArr.push(arr[j]);
        }
        newArr.push(arr[focalPoints[i]]);
        newFP.push(newArr.length-1);
        j=focalPoints[i]+1;
    }

    return {newArr, newFP};
}