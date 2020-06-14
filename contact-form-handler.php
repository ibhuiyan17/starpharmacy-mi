<?php
    $name = $_Post['name'];
    $visitor_email = $_POST['email'];
    $subject = $_Post['subject'];
    $message = $_Post['message'];

    $email_from= 'Starpharmacy@Starpharmacy.com';

    $email_subject= "New Website Form Submission";

    $email_body= "User Name: $name.\n"
                    "User Email: $visitor_email.\n".
                        "User Subject: $subject.\n".
                            "User Message: $message.\n";

    #to= "meaadhassan09@gmail.com";

    $headers ="From: $email_from \r \n";

    $headers .="Reply-To: $visitor_email \r\n";
    
    mail($to, $email_subject, $email_body,$headers);

    header("Location: index.html");

    
?>