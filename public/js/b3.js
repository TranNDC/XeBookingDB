function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#b3-header-avatar')
                .attr('src', e.target.result).width(170)
                .height(170);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function()
{
 $('#b3-icon-edit-fullname').click(function()
 {
    if ($("input[name='fullname']").is("[readonly]")) {
        $("input[name='fullname']").removeAttr("readonly");  
        $('#b3-icon-edit-fullname').attr('src','/img/icon/baseline-done-24px.svg');
    }
    else
        {$("input[name='fullname']").attr("readonly",true); 
        $('#b3-icon-edit-fullname').attr('src','/img/icon/baseline-create-24px-grey.svg');    
    }
 });

 $('#b3-icon-edit-password').click(function()
 {
    if ($("input[name='pasw']").is("[readonly]")) {
        $("input[name='pasw']").removeAttr("readonly");  
        $('#b3-icon-edit-password').attr('src','/img/icon/baseline-done-24px.svg');
    }
    else
        {$("input[name='pasw']").attr("readonly",true); 
        $('#b3-icon-edit-password').attr('src','/img/icon/baseline-create-24px-grey.svg');    
    }
 });

 $('#b3-icon-edit-phone').click(function()
 {
    if ($("input[name='phone']").is("[readonly]")) {
        $("input[name='phone']").removeAttr("readonly");  
        $('#b3-icon-edit-phone').attr('src','/img/icon/baseline-done-24px.svg');
    }
    else
        {$("input[name='phone']").attr("readonly",true); 
        $('#b3-icon-edit-phone').attr('src','/img/icon/baseline-create-24px-grey.svg');    
    }
 });

 $('#b3-icon-edit-email').click(function()
 {
    if ($("input[name='email']").is("[readonly]")) {
        $("input[name='email']").removeAttr("readonly");  
        $('#b3-icon-edit-email').attr('src','/img/icon/baseline-done-24px.svg');
    }
    else
        {$("input[name='email']").attr("readonly",true); 
        $('#b3-icon-edit-email').attr('src','/img/icon/baseline-create-24px-grey.svg');    
    }
 });

 $('#b3-icon-edit-location').click(function()
 {
    if ($("input[name='location']").is("[readonly]")) {
        $("input[name='location']").removeAttr("readonly");  
        $('#b3-icon-edit-location').attr('src','/img/icon/baseline-done-24px.svg');
    }
    else
        {$("input[name='location']").attr("readonly",true); 
        $('#b3-icon-edit-location').attr('src','/img/icon/baseline-create-24px-grey.svg');    
    }
 });

 $('.b3-choice').click(function(){
    let id_old_chosen = $('.b3-choice.b3-chosen').attr('id');
    id_old_chosen = "#b3"+id_old_chosen.slice(7);
    let id = $(this).attr('id');
    id = "#b3"+id.slice(7);
    console.log(id);
    $(id_old_chosen).addClass('hidden');
    $(id).removeClass('hidden');

    $('.b3-choice.b3-chosen').removeClass('b3-chosen');
    $(this).addClass('b3-chosen');
    
 });

 });