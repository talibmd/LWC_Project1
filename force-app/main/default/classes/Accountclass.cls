public with sharing class Accountclass 
{
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchToken)
    {
        try 
        {
            if(String.isEmpty(searchToken))
            {
                return [select Id,Name from Account];
            }
            else 
            {
                String searchText = '%'+searchToken+'%';
                return [select Id,Name from Account where Name like :searchText];  

            }
            
        } catch (Exception e) 
        {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    //apex class for Imperative Call
    @AuraEnabled
    public static List<Contact> getAccountContacts(String acId)
    {
            try 
            {
                system.debug('calling sql');
                return [select Id, Name from Contact where accountId= :acId];
                
            } 
            catch (Exception e) {
                system.debug('error in imperative call');
                throw new AuraHandledException(e.getMessage());
                
            }
        } 
}