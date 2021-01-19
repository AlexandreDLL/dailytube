<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

include 'Db.php';

use ReallySimpleJWT\Token;

require 'vendor/autoload.php';

$secret = 'sec!RmX89h5xS';

if($_SERVER["REQUEST_METHOD"] == 'GET' && isset($_GET['request'])){
    $_get = validate_request($_GET);
    $request = isset($_get['request']) ? $_get['request'] : null;
    if($request != null){
        $resp = Db::query($request);
        if($resp){
            echo json_encode(Db::$stmt->fetchAll(PDO::FETCH_ASSOC));
            exit();
        }
        else{
            echo json_encode($resp);
            exit();
        }
    }
    else{
        exit();
    }
}

switch ($_SERVER["REQUEST_METHOD"]) {
    case 'GET':
        $_get = validate_request($_GET);
        $table = isset($_get['table']) ? $_get['table'] : null;
        $params = [];
        $params['id'] = isset($_get['id']) ? $_get['id'] : null;
        $params['condition'] = isset($_get['condition']) ? $_get['condition'] : null;
        $params['orderBy'] = isset($_get['orderBy']) ? $_get['orderBy'] : null;
        verifyContent($table, $params);
        $token = isset($_get['token']) ? $_get['token'] : null;
        $join = isset($_get['join']) ? $_get['join'] : null;
        $authoTables = [];
        if($token == null){
            $authoTables = ['chaine', 'video', 'categorie', 'playlist', 'lister', 'reponse', 'commentaire', 'user'];
        }
        else{
            $valid = Token::validate($token, $secret);
            if($valid){
                $authoTables = ['*'];
            }
            else{
                exit();
            }
        }
        $authorization = getAuthorization($table, $authoTables);
        if($authorization){
            if(isset($join)){
                echo json_encode(Db::select($table, $params, $join));
                break;
            }
            else{
                echo json_encode(Db::select($table, $params));
                break;
            }
        }
        else{
            // var_dump("Passé par la");
            var_dump($authorization);
            var_dump($authoTables);

            exit();
        }
    case 'POST':
        $_post = json_decode(file_get_contents('php://input'), true);
        $_post = validate_request($_post);
        $table = isset($_post['table']) ? $_post['table'] : null;
        $params = isset($_post['params']) ? $_post['params'] : null;
        verifyContent($table, $params);
        $token = isset($_post['token']) ? $_post['token'] : null;
        $authoTables = [];
        if($token == null){
            $authoTables = ['user'];
        }
        else{
            $valid = Token::validate($token, $secret);
            if($valid){
                $role = Token::getPayload($token, $secret)['iss'];
                if($role == 1){
                    $authoTables = ['abonner', 'voter', 'reponse', 'commmentaire', 'video', 'copier', 'playlist', 'lister'];
                }
                elseif($role == 2){
                    $authoTables = ['*'];
                }
                else{
                    exit();
                }
            }
            else{
                exit();
            }
        }
        $authorization = getAuthorization($table, $authoTables);
        if($authorization){
            echo Db::insert($table, $params);
            break;
        }
        else{
            exit();
        }
    case 'PUT':
        $_put = json_decode(file_get_contents('php://input'), true); //tableau qui va contenir les données reçues
        $_put = validate_request($_put);
        $table = isset($_put['table']) ? $_put['table'] : null;
        $params = isset($_put['params']) ? $_put['params'] : null;
        verifyContent($table, $params);
        $token = isset($_put['token']) ? $_put['token'] : null;
        $authoTables = [];
        if($token == null){
            $authoTables = [''];
        }
        else{
            $valid = Token::validate($token, $secret);
            if($valid){
                $role = Token::getPayload($token, $secret)['iss'];
                if($role == 1){
                    $authoTables = ['video', 'playlist', 'lister', 'user', 'chaine'];
                }
                elseif($role == 2){
                    $authoTables = ['*'];
                }
                else{
                    exit();
                }
            }
            else{
                exit();
            }
        }
        $authorization = getAuthorization($table, $authoTables);
        if($authorization){
            // echo ("Ca a l'air bon");
            echo Db::update($table, $params);
            break;
        }
        else{
            exit();
        }
    case 'DELETE':
        $_del = json_decode(file_get_contents('php://input'), true); //tableau qui va contenir les données reçues
        $_del = validate_request($_del);
        $table = isset($_del['table']) ? $_del['table'] : null;
        $id = isset($_del['id']) ? $_del['id'] : null;
        verifyContent($table, $id);
        $token = isset($_delete['token']) ? $_delete['token'] : null;
        $authoTables = [];
        if($token == null){
            $authoTables = [''];
        }
        else{
            $valid = Token::validate($token, $secret);
            if($valid){
                $role = Token::getPayload($token, $secret)['iss'];
                if($role == 1){
                    $authoTables = ['video', 'playlist', 'lister', 'user', 'chaine', 'copier', 'abonner'];
                }
                elseif($role == 2){
                    $authoTables = ['*'];
                }
                else{
                    exit();
                }
            }
            else{
                exit();
            }
        }
        $authorization = getAuthorization($table, $authoTables);
        if($authorization){
            echo Db::delete($table, $id);
            break;
        }
        else{
            exit();
        }
    default:
        exit();
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

function verifyContent($table, $params){
    if($table == null || $params == null){
        exit();
    }
}

function getAuthorization($table, $authoTables){
    if(in_array($table, $authoTables) || $authoTables[0] === '*'){
        return true;
    }
    else{
        return false;
    }
}