
//for AI training plan put a question mark icon and a panel that pops up & explains what it does

export function Scheduling(){
    return(
        <>
            <h3 style={{position: 'fixed', left: '65%', color: 'blueviolet'}}> Your Schedules: </h3>
            <div id='training-plan-div'>
                <button style={{position: 'fixed', left: '15%', top: '30%', width: '300px', height: '75px'}}> Create a Manual Training Plan</button>
                <button style={{position: 'fixed', left: '15%', top: '60%', width: '300px', height: '75px'}}> Create an Training Plan with AI</button>
            </div>
        </>
    )
}