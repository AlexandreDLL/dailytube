<?php

class Db {

    private static $db = null;
    private static $stmt = null;
    public static $prefix = '$argon2id$v=19$m=1024,t=4,p=1$';

    private static function getDb(){
        if(self::$db === null){
            $dsn = 'mysql:host=localhost;port=3306;dbname=dailytube;charset=utf8';
            $user = 'root';
            try{
                self::$db = new PDO($dsn, $user, '');
            }
            catch(PDOException $e){
                var_dump($e);
            }
        }
        return self::$db;
    }

    public static function query($sql, $params = null){
        try{
            self::$stmt = self::getDb()->prepare($sql);
            $resp = self::$stmt->execute($params);
        }
        catch(PDOException $e){
            var_dump($e);
        }
        return $resp;
    }

    public static function select($table, $params, $join = null){
        $id = $params['id'] != null ? $params['id'] : null;
        $condition = $params['condition'] != null ? $params['condition'] : null;
        $orderBy = $params['orderBy'] != null ? $params['orderBy'] : null;
        $where = null;
        $order = null;
        $params = [];

        if($orderBy != null){
            $order = $orderBy['filter'].' '.$orderBy['order'];
        }

        if(isset($condition)){
            $where = $condition['attribut'].' '.$condition['operator'].' ?';
            $params[] = $condition['value'];
        }

        if(isset($id) && isset($where)){
            $where .= ' AND id = ?';
            $params[] = $id;
        }
        elseif(isset($id) && !isset($where)){
            $where = 'id = ?';
            $params[] = $id;
        }

        $sql = "SELECT * FROM $table";

        if(isset($where)){
            $sql .= " WHERE $where";
        }
        if(isset($join)){
            $sql .= " JOIN $join";
        }
        if(isset($order)){
            $sql .= " ORDER BY $order";
        }

        $resp = self::query($sql, $params);
        if($resp){
            $rows = self::$stmt->fetchAll(PDO::FETCH_ASSOC);
            return $rows;
        }
        else{
            return false;
        }
    }

    public static function insert($table, $params){
        $attributs = null;
        $values = null;
        $valueParams = [];
        // USER
        if($table == 'user'){
            $sql = "SELECT pseudo, email FROM user";
            $resp = Db::query($sql);
            if($resp){
                $users = self::$stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($users as $user){
                    if($user['pseudo'] === $params['pseudo']){
                        return 'pseudo exist';
                    }
                    elseif($user['email'] === $params['email']){
                        return 'email exist';
                    }
                }
            }
            else{
                return false;
            }
            $sql = "INSERT INTO chaine(id) VALUES(NULL)";
            $resp = self::query($sql);
            if($resp){
                $id_chaine = self::$db->lastInsertId();
                $attributs .= 'id_chaine,';
                $values .= '?,';
                $valueParams[] = $id_chaine;
            }
            else{
                return false;
            }
        }

        foreach($params as $key => $value){
            if($key == 'password'){
                $option = [
                    'memory_cost' => 1024
                ];
                $hash = password_hash($value, PASSWORD_ARGON2ID, $option);
                $valueParams[] = str_replace(self::$prefix, '', $hash);
            }
            else{
                $valueParams[] = $value;
            }
            $attributs .= $key.',';
            $values .= '?,';
        }
        $attributs = substr($attributs, 0, -1);
        $values = substr($values, 0, -1);
        $sql = "INSERT INTO $table($attributs) VALUES($values)";
        $resp = self::query($sql, $valueParams);
        return $resp;
    }

    public static function update($table, $params){
        $where = null;
        $set = '';
        foreach($params as $key => $value){
            if($key == 'id'){
                $where = $key.' = '.$value;
            }
            else{
                $set .= $key." = '".$value."',";
            }
        }
        $set = substr($set, 0, -1);
        $sql = "UPDATE $table SET $set WHERE $where";
        $resp = self::query($sql);
        return $resp;
    }

    public static function delete($table, $id){
        $sql = "DELETE FROM $table WHERE id = $id";
        $resp = self::query($sql);
        return $resp; // $resp = PDO return true; $resp = false return false;
    }
}