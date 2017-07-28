public without sharing class light_accountOppor_c {
	
    @AuraEnabled
    public static List<Account> getAccounts() {
        return [select id,name from Account limit 50];
    }
    
    @AuraEnabled
    public static List<Opportunity> getOpportunities(Id acc) {
        return [select id,name from Opportunity where Account.id =: acc limit 25];
    }
}