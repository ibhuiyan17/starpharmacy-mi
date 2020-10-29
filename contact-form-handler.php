<?php
    $name = $_Post['name'];
    $visitor_email = $_POST['email'];
    $subject = $_Post['subject'];
    $message = $_Post['message'];

    $to= 'starpharmacymi@gmail.com';

    $email_subject= 'New Website Form Submission'.$subject;

    $email_body= "User Name: $name.\n"
                    "User Email: $visitor_email.\n"
                        "User Subject: $subject.\n"
                            "User Message: $message.\n";


    $headers ='From: '.$visitor_email;
    
    mail($to, $email_subject, $email_body,$headers);

    header("Location: index.html");

    
?>