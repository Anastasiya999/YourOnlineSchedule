
$(document).ready(function(){
    $('#group_course').change(function() {
        $('#group_semester').prop('disabled', $(this).val() === '0');
    }).change();
  
    $('#group_semester').change(function() {
        $('#group_subjects').prop('disabled', $(this).val() === '0');
    }).change();

    $('#plan_semester').change(function() {
        $('#plan_subjects').prop('disabled', $(this).val() === '0');
    }).change();

    $("#group_semester").change(function(){
        var semester = $('#group_semester option:selected').val(); 
        var course =  $('#group_course option:selected').text();
        

        $.ajax({
            url: '/select-json/'+semester+'/'+course,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({course, semester}),
            type: 'POST',
            success: function(data){
                 console.log(data);
                 $('#group_subjects').empty();
                 $('#group_subjects').append("<option disabled selected> Wybierz przedmiot..</option>");
                 $.each(data.data, function (index, subject) {
                    $('#group_subjects').append("<option value = '" +  subject.name + "' > " + subject.name + ". </option > ");
                });
                
            },
            error: ((error) => {
                console.log("Error:", error);
            })
        });

    });
    $("#group_course").on(function(){
        
        if (window.location.pathname!="/")
        {
            console.log(window.location.pathname);
            window.location.assign("../");
        }   
          

    });
   
});

function changeSelectPlan(user_id){
        var semester = $('#plan_semester option:selected').val(); 
        var course =  $('#plan_course option:selected').text();
        console.log(semester,course,user_id);
        $.ajax({
            url: '/plan/'+user_id+'/edit/select-plan-json/'+semester+'/'+course,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({course, semester}),
            type: 'POST',
            success: function(data){
                 console.log(data);
                 $('#plan_subjects').empty();
                 $('#plan_subjects').append("<option disabled selected> Wybierz przedmiot..</option>");
                 $.each(data.data, function (index, subject) {
                    $('#plan_subjects').append("<option value = '" +  subject.name + "' > " + subject.name + ". </option > ");
                });
                
            },
            error: ((error) => {
                console.log("Error:", error);
            })
        });
}
function show(){
    
}
function deletePlanRecord(plan_id,user_id){
    
    
   $.ajax({
        url: '/plan/'+user_id+'/edit/delete-json/'+plan_id,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({plan_id}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log(plan_id, "Result: ", res);
            
            $("#"+plan_id).remove();
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}
