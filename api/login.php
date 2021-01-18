<?php

header('Access-Control-Allow-Origin: *');


require 'Db.php';

use ReallySimpleJWT\Token;

require 'vendor/autoload.php';

if($_SERVER["REQUEST_METHOD"] == 'POST'){
    $_post = json_decode(file_get_contents('php://input'), true);
    $_post = validate_request($_post);
    $secret = 'sec!RmX89h5xS';
    if(!isset($_post['token']) && !isset($_post['user'])){
        $params = [
            'id' => null,
            'condition' => [
                'attribut' => 'email',
                'operator' => '=',
                'value' => $_post['email']
            ],
            'orderBy' => null
        ];
        $user = Db::select("user", $params);
        if(count($user) == 1){
            $user = $user[0];
            $dbpass = Db::$prefix.$user["password"];
            $test = password_verify($_post['password'], $dbpass);
            if($test){
                $userId = $user['id_User'];
                $expiration = time() + (30 * 86400);
                $role = $user['id_Role'];
                $token = Token::create($userId, $secret, $expiration, $role);
                $resp = [
                    'user' => $user,
                    'token' => $token
                ];
                echo json_encode($resp);
            }
            else{
                echo json_encode(false);
            }
        }
        else{
            echo json_encode(false);
        }
    }
    elseif(isset($_post['token']) && isset($_post['user'])){
        $token = $_post['token'];
        $userId = $_post['user'];
        $payloadUserId = Token::getPayload($token, $secret)['user_id'];
        if($payloadUserId == $userId){
            $result = Token::validate($token, $secret);
            if($result){
                $params = [
                    'id' => $userId,
                    'condition' => null,
                    'orderBy' => null
                ];
                $user = Db::select("user", $params);
                echo json_encode($user);
            }
            else{
                echo json_encode('error token');
            }
        }
        else{
            echo json_encode(false);
        }
    }
    else{
        echo json_encode(false);
    }
} 
else{
    echo json_encode(false);
}

function validate_request($request)
{
    foreach ($request as $k => $v) {
        if(is_array($v)){
            validate_request($v);
        }
        else{
            $request[$k] = htmlspecialchars(strip_tags(stripslashes(trim($v))));
        }
    }
    return $request;
}

