<?php


$intent=$_GET['int'];
$host='localhost';
$user='id2243824_jude';
$password='ajk1407';
$database='id2243824_raveg';


$connection=mysqli_connect($host,$user,$password,$database);
if($intent=='GetOrderDueDate'){
$dd=$_GET['dd'];
$sql = "SELECT * FROM Parts where job_number=$dd";
$post_results=mysqli_query($connection,$sql);
$row = mysqli_fetch_assoc($post_results);
$result = $row['due_date'];
$myObj = new stdClass();
if(strlen($result)>0){
$myObj->res = "The due date is ".$result;
}
else{
$myObj->res="I could not find any such order";
}
$myJSON = json_encode($myObj);
echo $myJSON;
}

if($intent=='GetCustomer'){
$order=$_GET['dd'];
$sql = "SELECT * FROM Orders where order_id=$order";
$post_results=mysqli_query($connection,$sql);
$row = mysqli_fetch_assoc($post_results);
$result = $row['customer'];
$myObj = new stdClass();
if(strlen($result)>0){
$myObj->res = "The customer is ".$result;
}
else{
$myObj->res="I could not find any such order";
}
$myJSON = json_encode($myObj);
echo $myJSON;
}

if($intent=='GetPartsInOrder'){
$order=$_GET['dd'];
$count="SELECT COUNT(part_number) FROM Parts where order_id=$order";
$post_count=mysqli_query($connection,$count);
$answer= mysqli_fetch_array($post_count);
$sql = "SELECT part_number FROM Parts where order_id=$order";
$post_results=mysqli_query($connection,$sql);
if($answer[0]==1)
{
$results= "There is ".$answer[0]." part. It is ";
}
else{
$results= "There are ".$answer[0]." parts. They are ";
}
while($row = mysqli_fetch_array($post_results)){
	$results=$results.$row['part_number']." , ";
}
$myObj = new stdClass();
if($answer[0]>0){
$myObj->res = $results;
}
else{
$myObj->res="I could not find any such order";
}
$myJSON = json_encode($myObj);
echo $myJSON;
}

if($intent=='GetPendingOrders'){
$count="SELECT COUNT(order_id) FROM Orders where status=1";
$post_count=mysqli_query($connection,$count);
$answer= mysqli_fetch_array($post_count);
$sql = "SELECT order_id FROM Orders where status=1";
$post_results=mysqli_query($connection,$sql);
if($answer[0]==1){
$results= "There is ".$answer[0]." order. It is ";
}
else{
$results= "There are ".$answer[0]." orders. They are ";
}
while($row = mysqli_fetch_array($post_results)){
	$results=$results."<say-as interpret-as='characters'>";
        $results=$results.$row['order_id']."</say-as><break time='0.5s'/>";

}
$myObj = new stdClass();
if($answer[0]>0){
$myObj->res = $results;
}
else{
$myObj->res = "There are no pending orders";
}
$myJSON = json_encode($myObj);
echo $myJSON;
}
/*if($intent=='GetQuantity'){
$order=$_GET['dd'];
$sql = "SELECT * FROM Parts where order_id=$order";
$post_results=mysqli_query($connection,$sql);
$row = mysqli_fetch_assoc($post_results);
$result = $row['part_number'];
$myObj = new stdClass();
$myObj->res = $result;
$myJSON = json_encode($myObj);
echo $myJSON;
}*/

mysqli_close($connection);


?>
