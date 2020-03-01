import {expect,test} from '@oclif/test'

describe ('Admin --newuser', () => {
  test
   .stdout()
   .command([
      'Admin', '--newuser','test' ,
      '--passw','test','--email', 'test@test.com', '--quota', '10'
    ])
   .do(output => expect(output.stdout).to.equal('User Created\n') )
   .it()
})

describe ('Admin --moduser', () => {
  test
   .stdout()
   .command([
      'Admin', '--moduser','test' ,
      '--passw','test','--email', 'test1@test.com', '--quota', '10'
    ])
   .do(output => {
      let log = 'username:  test \npassword:  test \nemail: test1@test.com \nquota  10\n'
      expect(output.stdout).to.equal(log)
    })
   .it()
})

describe ('Admin --userstatus', () => {
  test
   .stdout()
   .command(['Admin', '--userstatus','test'])
   .do(output => {
      let log = '{ "username": "test", "email": "test1@test.com", "quota": "10" }'
      expect(output.stdout).to.contain(JSON.parse(log))
   })
   .it()
})
