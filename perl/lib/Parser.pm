package Parser;
use strict;
use warnings;
use Log;

sub new {
  my ($class, %args) = @_;
  return bless \%args, $class;
}

sub parse {
  my $self = shift;
  my $filename = $self->{filename};
  my @result;

  open my $fh, '<' , $filename or die $!;
  my @lines = <$fh>;

  for my $line (@lines) {
    chomp($line);

    push(@result, Log->new(
        map{
        my ($key, $val) = split(/:/, $_, 2);
        ($val ne "-")? ($key => $val) : ();
        } split /\t/, $line)
    );
  }

  return \@result;
} 

1;
