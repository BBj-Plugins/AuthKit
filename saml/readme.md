**Setting up SAML**

*1. Setting Up the Servlet*

The Servlet `AuthKit/saml/SAMLLogin.bbj` is a BBx Servlet that handles the communication between the SAML provider and the application / SAML Login Widget.
It uses the `./cfg/sampl.properties` file by default. The version which comes with the plug-in is prepared for testing with  the samltest.id service. 

The code snippet in the top shows the parameters to deploy using the admin API. You can also Enterprise Manager to deploy the servlet on a permanent base.

suggested settings:
URL Mapping: /SAMLLogin/*
Source File: <bbxdir>/plugins/AuthKit/saml/SAMLLogin.bbj
Class Name: SAMLLogin
Method Name: service

In order to specify a separate config outside the plug-in folder (which would be overridden by updates!) , you can either 
* add a line `SET SAML.PROPFILE=/path/to/your/file` to the config.bbx
* add a parameter `SAML.PROPFILE` with the value being the path to the SAML properties file 
That way you can keep the properties file outside the core plug-in. 

You can test the servlet code by executing `http://localhost:8888/SAMLLogin/metadata` (provided you deployed the servlet as suggested)

*2. Using the SamlLoginWidget*

The class `AuthKit/widgets/SamlLoginWidget` implements a standalone widget that works in GUI, BUI and DWC. It shows a BBjHtmlView with an embedded push button. With the click on that button the user will be forwarded to the SAML provider and authenticated. If the application would like to start the SAML process immediately, the method doLogin() can be executed after creating the widget.

For proper function the method `SamlLoginWidget::setSamlServletUrl()` has to be called, setting the proper path to the deployed servlet.

Inspect the program `AuthKit/demo/SamlLoginDemo.bbj` to have an example.

*3. Attributes Mapping*

The AuthKit/profile/SamlAccountProfile class creates an account profile from the values returned. In addition it grants access to all the properties returned by the provider, using the method `getSamlAttributes()`.
The following OID attribute strings will directly be mapped:

| Field     | Attribute Key                     |
| --------- | --------------------------------- |
| FirstName | urn:oid:2.5.4.4                   |
| LastName  | urn:oid:2.5.4.42                  |
| FullName  | urn:oid:2.16.840.1.113730.3.1.241 |
| EMail     | urn:oid:0.9.2342.19200300.100.1.3 |



