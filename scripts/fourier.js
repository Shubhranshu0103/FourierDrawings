function dft(y)
{
    const N = y.length;
    let Y = [];
    for(let k=0;k<N;k++)
    {
        let re = 0;
        let im = 0;

        for(let n=0;n<N;n++)
        {
            //console.log("n:"+n);
            re+=y[n]*cos(TWO_PI*k*n/N);
            im-=y[n]*sin(TWO_PI*k*n/N);
        }
        re/=N;
        im/=N;
        let freq = k;
        let amp = sqrt(re*re+im*im);
        let phase = atan2(im,re);

        Y[k] = {re,im,freq,amp,phase};
    }

    return Y;
}